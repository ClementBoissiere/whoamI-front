import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const key = "whoAmI";
const keyDate = "whoAmIDate";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private dataSubject: BehaviorSubject<Array<string>>;

  public newData: Observable<Array<string>>;

  constructor() {
    const initialData = this.getMessages();
    this.dataSubject = new BehaviorSubject<Array<string>>(initialData);

    this.newData = this.dataSubject.asObservable();
  }

  public saveData(value: string) {
    let messages = this.getMessages();
    messages.push(value);
    console.log("stringify : " + JSON.stringify(messages));
    localStorage.setItem(key, JSON.stringify(messages));

    this.dataSubject.next(messages);
  }

  public getData(): Array<string> {
    let messages = this.getMessages();
    return messages;
  }

  public removeData() {
    localStorage.removeItem(key);
    this.dataSubject.next([]);
  }

  private getMessages(): Array<string> {
    const messages = localStorage.getItem(key) ?? '';
    console.log("messages :" + messages);
    if (messages) {
      return <Array<string>>JSON.parse(messages);
    }
    return [];
  }

  private setDate(): void {
    const today = new Date();
    localStorage.setItem(keyDate, today.toDateString());
  }

  public checkDateAndRemoveDatas(): void {
    const memoryDateString = localStorage.getItem(keyDate);
    if (!memoryDateString) {
      this.setDate();
      return;
    }
    const memoryDate = new Date(memoryDateString);
    if (this.isNotSameDay(memoryDate)) {
      this.removeData();
      this.setDate();
    }
  }
  
  isNotSameDay(date: Date): boolean {
    return !this.isSameDay(date);
  }

  isSameDay(date: Date): boolean {
  
    const currentDate = new Date();

    return (
      currentDate.getFullYear() === date.getFullYear() &&
      currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() === date.getDate()
    );
  }


}