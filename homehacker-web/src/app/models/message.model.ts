import { User } from "./user.model";

export class Message {
    from: User;
    to: User;
    text: string;
    updatedAt: Date;
    createdAt: Date;
}
