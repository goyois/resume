package com.toyboyz.swportfolio.visit;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    private final VisitCounterService visitCounterService;

    public VisitController(VisitCounterService visitCounterService) {
        this.visitCounterService = visitCounterService;
    }

    /** 오늘 처음 방문했을 때만 프론트에서 호출해 카운트를 올린다. */
    @PostMapping
    public VisitStats track() {
        return visitCounterService.recordVisit();
    }

    /** 이미 오늘 방문 처리된 경우, 현재 값만 조회한다. */
    @GetMapping
    public VisitStats getStats() {
        return visitCounterService.currentStats();
    }
}
