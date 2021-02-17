import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  @Input() link: string;

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', {static: true}) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText',{static: true}) bodyText: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      // if there is a text overflow , show fadeout

      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      //else hide the fadeout
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  onXButtonClick() { 
    this.deleteEvent.emit();
  }
}
 