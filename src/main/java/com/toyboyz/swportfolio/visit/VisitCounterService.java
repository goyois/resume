package com.toyboyz.swportfolio.visit;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Properties;

/**
 * 방문자 수를 세는 서비스. DB 없이 로컬 파일에 today/total 카운트를 저장해
 * 서버가 재시작돼도 값이 유지되도록 한다.
 */
@Service
public class VisitCounterService {

    private static final ZoneId ZONE = ZoneId.of("Asia/Seoul");

    private final Path dataFile;
    private final Object lock = new Object();

    private String date;
    private long todayCount;
    private long totalCount;

    public VisitCounterService(@Value("${visit.data-file:./data/visit-stats.properties}") String dataFilePath) {
        this.dataFile = Path.of(dataFilePath);
    }

    @PostConstruct
    void init() {
        synchronized (lock) {
            load();
            rolloverIfNeeded();
        }
    }

    public VisitStats recordVisit() {
        synchronized (lock) {
            rolloverIfNeeded();
            todayCount++;
            totalCount++;
            save();
            return new VisitStats(date, todayCount, totalCount);
        }
    }

    public VisitStats currentStats() {
        synchronized (lock) {
            rolloverIfNeeded();
            return new VisitStats(date, todayCount, totalCount);
        }
    }

    /** 서버 기준(KST) 오늘 날짜. 컨트롤러가 방문 쿠키와 비교할 때 사용한다. */
    public String todayDateString() {
        return LocalDate.now(ZONE).toString();
    }

    private void rolloverIfNeeded() {
        String today = LocalDate.now(ZONE).toString();
        if (!today.equals(date)) {
            date = today;
            todayCount = 0;
        }
    }

    private void load() {
        date = LocalDate.now(ZONE).toString();
        todayCount = 0;
        totalCount = 0;

        if (!Files.exists(dataFile)) {
            return;
        }

        Properties props = new Properties();
        try (InputStream in = Files.newInputStream(dataFile)) {
            props.load(in);
            date = props.getProperty("date", date);
            todayCount = parseLongSafely(props.getProperty("today"));
            totalCount = parseLongSafely(props.getProperty("total"));
        } catch (IOException e) {
            // 파일을 못 읽으면 0부터 다시 센다
        }
    }

    private long parseLongSafely(String value) {
        if (value == null) {
            return 0;
        }
        try {
            return Long.parseLong(value);
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private void save() {
        Properties props = new Properties();
        props.setProperty("date", date);
        props.setProperty("today", String.valueOf(todayCount));
        props.setProperty("total", String.valueOf(totalCount));

        try {
            Path parent = dataFile.getParent();
            if (parent != null) {
                Files.createDirectories(parent);
            }
            try (OutputStream out = Files.newOutputStream(dataFile)) {
                props.store(out, "portfolio visit stats");
            }
        } catch (IOException e) {
            // 카운트 저장에 실패해도 응답 자체는 정상 반환한다
        }
    }
}
