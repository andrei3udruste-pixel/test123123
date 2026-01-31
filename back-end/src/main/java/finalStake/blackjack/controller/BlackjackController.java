package finalStake.blackjack.controller;

import finalStake.dto.blackjack.DealRequest;
import finalStake.blackjack.model.DealResult;
import finalStake.blackjack.service.BlackjackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blackjack")
@CrossOrigin(origins = "http://localhost:4225")
public class BlackjackController {

    @Autowired
    private BlackjackService blackjackService;

    @PostMapping("/deal")
    public DealResult deal(@RequestBody DealRequest dealRequest) {
        return blackjackService.deal(dealRequest.getBet());
    }
}