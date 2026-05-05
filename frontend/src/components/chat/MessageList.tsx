import { FC } from 'react';
import { Message } from '../../types';
import { MessageBubble } from './MessageBubble';
import { LoadingMessage } from './LoadingMessage';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-8 pb-6 pt-1">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && <LoadingMessage />}
    </div>
  );
};
