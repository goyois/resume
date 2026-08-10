package com.toyboyz.swportfolio.visit;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    private static final String VISIT_COOKIE_NAME = "visit_last_date";
    private static final int VISIT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 2;

    private final VisitCounterService visitCounterService;

    public VisitController(VisitCounterService visitCounterService) {
        this.visitCounterService = visitCounterService;
    }

    /**
     * 프론트가 페이지 로드마다 호출한다. "오늘 이미 카운트했는지"는 클라이언트의
     * 로컬 시간대가 아니라 서버 기준(KST) 날짜와 방문 쿠키를 비교해 서버가 판단한다.
     */
    @PostMapping
    public VisitStats track(HttpServletRequest request, HttpServletResponse response) {
        String today = visitCounterService.todayDateString();
        String lastVisitDate = readCookie(request, VISIT_COOKIE_NAME);

        if (today.equals(lastVisitDate)) {
            return visitCounterService.currentStats();
        }

        VisitStats stats = visitCounterService.recordVisit();
        response.addCookie(buildVisitCookie(today));
        return stats;
    }

    /** 카운트를 올리지 않고 현재 값만 조회한다. */
    @GetMapping
    public VisitStats getStats() {
        return visitCounterService.currentStats();
    }

    private String readCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if (name.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    private Cookie buildVisitCookie(String value) {
        Cookie cookie = new Cookie(VISIT_COOKIE_NAME, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(VISIT_COOKIE_MAX_AGE_SECONDS);
        return cookie;
    }
}
