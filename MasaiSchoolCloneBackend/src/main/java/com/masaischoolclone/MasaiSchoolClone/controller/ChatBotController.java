package com.masaischoolclone.MasaiSchoolClone.controller;


import config.ChatGptRequest;
import config.ChatGptResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/bot")
public class ChatBotController {
	
	
	private String model="gpt-3.5-turbo";
	
	
	private String url="https://api.openai.com/v1/chat/completions";
	
	@Autowired
	private RestTemplate template;
	
	
	
	
	@GetMapping("/chat/{prompt}")
	public ResponseEntity<Map<String,String>> getResponseFromOpenApi(@PathVariable String prompt){


		try {
//			String s = "i love you";
			ChatGptRequest chatRequest=new ChatGptRequest(model,prompt);
			ChatGptResponse chatGptResponse=template.postForObject(url, chatRequest, ChatGptResponse.class);
			String response=chatGptResponse.getChoices().get(0).getMessage().getContent();
			return ResponseEntity.ok(Map.of("message",response));
		}catch (Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error",e.getMessage()));
		}
	  
	}

}
