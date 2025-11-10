import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore, Firestore, query, orderBy, getDocs, doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private db: Firestore;
  private messagesCollection;

  constructor() {
    // this.db = getFirestore();
    // this.messagesCollection = collection(this.db, 'messages');
  }

  async getMessages() {
    const messagesQuery = query(this.messagesCollection, orderBy("timestamp"));
    const messageSnapshot = await getDocs(messagesQuery);
    return messageSnapshot.docs.map(doc => {
      const data = doc.data();
      if (typeof data === 'object' && data !== null) {
        return { id: doc.id, ...data };
      } else {
        return { id: doc.id };
      }
    });
  }


  async addMessage(message: string, sender: string) {
    await addDoc(this.messagesCollection, { message, sender, timestamp: new Date() });
  }
}
