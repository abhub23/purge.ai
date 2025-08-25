import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { ComponentProps, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import type { UIMessage } from 'ai';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage['role'];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      'group flex w-full items-end justify-end gap-2 py-4',
      from === 'user' ? 'is-user' : 'is-assistant flex-row-reverse justify-end',
      '[&>div]:max-w-[90%]',
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({ children, className, ...props }: MessageContentProps) => (
  <div
    className={cn(
      'flex flex-col gap-80 overflow-hidden rounded-md px-4 py-2 text-justify text-sm',
      'group-[.is-user]:bg-neutral-800 group-[.is-user]:text-neutral-100',
      'group-[.is-assistant]:bg-transparent group-[.is-assistant]:text-neutral-100',
      className
    )}
    {...props}
  >
<div className="is-user:dark">
    <div className="[&_a]:text-inherit [&_a]:underline">{children}</div>
  </div>  </div>
);

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const MessageAvatar = ({ src, name, className, ...props }: MessageAvatarProps) => (
  <Avatar className={cn('ring-border size-8 ring ring-1', className)} {...props}>
    <AvatarImage alt='' className='mt-0 mb-0' src={src} />
    <AvatarFallback>{name?.slice(0, 2) || 'ME'}</AvatarFallback>
  </Avatar>
);
