import { Component, OnInit } from '@angular/core';
import { ChatService } from 'app/chat.service';
import { from, merge, Observable, Subject } from 'rxjs';
import { Message, SendMessageEvent, User } from '@progress/kendo-angular-conversational-ui';
import { map, scan } from 'rxjs/operators';
import { HeroSearchService } from 'app/hero-search.service';
import { HeroService } from 'app/hero.service';
import { Hero } from 'app/hero';

@Component({
  selector: 'my-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public feed: Observable<Message[]>;

  public readonly user: User = {
    id: 1
  };

  public readonly bot: User = {
    id: 0
  };

  private local: Subject<Message> = new Subject<Message>();

  constructor(private svc: ChatService, private heroSearchService: HeroSearchService, private heroService: HeroService) {
    const hello: Message = {
      author: this.bot,
      suggestedActions: [{
        type: 'reply',
        value: 'Yes!'
      }, {
        type: 'reply',
        value: 'Do you have any suggestions?'
      }],
      timestamp: new Date(),
      text: 'Hello! Do you have a favorite hero?'
    };

    // Merge local and remote messages into a single stream
    this.feed = merge(
      from([ hello ]),
      this.local,
      this.svc.responses.pipe(
        map((response): Message => ({
          author: this.bot,
          text: response
        })
      ))
    ).pipe(
      // ... and emit an array of all messages
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );
  }

  ngOnInit(): void {
  }

  public sendMessage(e: SendMessageEvent): void {
    this.local.next(e.message);

    this.local.next({
      author: this.bot,
      typing: true
    });

    if(e.message.text == "Yes!") {
      setTimeout(
        () => this.local.next({
          author: this.bot,
          text: 'Please, tell me, what are they? Please, write them one at the time.',
        }),
        1000
      );
    }
    else {
      if(e.message.text == "Do you have any suggestions?") {
        setTimeout(
          () => this.local.next({
            author: this.bot,
            text: 'I have a few ideas. You can also type your own if you want.',
            suggestedActions: [
              {type: 'reply',value: 'Superman'}, {type: 'reply',value: 'Spider-man'}, {type: 'reply',value: 'Wolverine'}
            ]
          }),
          1000
        );
      }
      else {
        this.heroSearchService.search(e.message.text).subscribe(x => {
          if(x.length > 0 && x.find(x => x.name == e.message.text) != undefined) {
            this.local.next({
              author: this.bot,
              text: `I think we already have ${e.message.text} in our database! We like him/her too!`
            })
          } else {
            let newHero: Hero = {id: null, name: e.message.text, scrollViewItems: []};
            this.heroService.save(newHero).subscribe(x => {
              this.local.next({
                author: this.bot,
                text: `We didn't have "${x.name}" before! We just added it with id "${x.id}" to our list! Thanks for your help! You can tell me about more heros if you want and we can try to add more.`
              });
            });
          }
        });

//        this.svc.submit(e.message.text);
      }
    }

  }

}
