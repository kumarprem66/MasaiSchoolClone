import { Component } from '@angular/core';
import { ChatbotserviceService } from '../services/chatbotservice.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {

 
  // sendMessage() {
  //   if (this.userInput.trim()) {
      // this.chatbotService.sendMessage(this.userInput).subscribe(response => {
      //   this.botResponse = response.message; // Assuming the response contains a 'message' property

      //   console.log(this.botResponse)
      // });
  //     this.userInput = ''; // Clear input after sending
  //   }
  // }

  showChatbot: boolean = false;
  inputMessage: string = '';
  messages: { text: string, from: string }[] = [];

  constructor(private chatBotService:ChatbotserviceService) { 

  }

  ngOnInit(): void {
  }

  toggleChatbot() {
    this.showChatbot = !this.showChatbot;
  }
  handleBotResponse() {
    // Simulate bot response (replace with your logic)
    
    this.chatBotService.sendMessage(this.inputMessage).subscribe(response => {
        const botResponse = response.message; // Assuming the response contains a 'message' property

        // console.log(botResponse)
        this.messages.push({ text: botResponse, from: 'bot' });
      },error=>{
        // console.log(error.error);
        this.messages.push({ text: "some error has occured...", from: 'bot' });
      });
  
  }
  sendMessage() {
    if (this.inputMessage.trim() !== '') {
      // console.log("called...........")
      this.messages.push({ text: this.inputMessage, from: 'user' });
      // Add logic here to handle bot response
      this.handleBotResponse()
      this.inputMessage = '';
    }
  }
}
