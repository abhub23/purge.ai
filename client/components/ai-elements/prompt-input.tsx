'use client';

import { Loader2Icon, Send, SquareIcon, XIcon } from 'lucide-react';
import type { ComponentProps, HTMLAttributes, KeyboardEventHandler } from 'react';
import { Children } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ChatStatus } from 'ai';

export type PromptInputProps = HTMLAttributes<HTMLFormElement>;

export const PromptInput = ({ className, ...props }: PromptInputProps) => (
  <form
    className={cn(
      'mx-auto w-80 divide-y overflow-hidden rounded-xl border-2 border-neutral-500 p-3 shadow-sm lg:w-180',
      className
    )}
    {...props}
  />
);

export type PromptInputTextareaProps = ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
};

export const PromptInputTextarea = ({
  onChange,
  className,
  placeholder = 'Paste your  Pull / Merge Request Url',
  minHeight = 48,
  maxHeight = 164,
  ...props
}: PromptInputTextareaProps) => {
  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow newline
        return;
      }

      // Submit on Enter (without Shift)
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <Textarea
      className={cn(
        'w-full resize-none rounded-none border-none p-3 text-sm shadow-none ring-0 outline-none',
        'field-sizing-content max-h-[6lh] dark:bg-neutral-900',
        'focus-visible:ring-0',
        className
      )}
      name='message'
      onChange={(e) => {
        onChange?.(e);
      }}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  );
};

export type PromptInputToolbarProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputToolbar = ({ className, ...props }: PromptInputToolbarProps) => (
  <div className={cn('flex items-center justify-between p-1', className)} {...props} />
);

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTools = ({ className, ...props }: PromptInputToolsProps) => (
  <div className={cn('flex items-center gap-1', className)} {...props} />
);

export type PromptInputButtonProps = ComponentProps<typeof Button>;
export const PromptInputButton = ({
  variant = 'ghost',
  className,
  size,
  ...props
}: PromptInputButtonProps) => {
  const newSize = (size ?? Children.count(props.children) > 1) ? 'default' : 'icon';

  return (
    <Button
      className={cn(
        'shrink-0 gap-1.5 rounded-lg',
        variant === 'ghost' && 'text-muted-foreground',
        newSize === 'default' && 'px-3',
        className
      )}
      size={newSize}
      type='button'
      variant={variant}
      {...props}
    />
  );
};

export type PromptInputSubmitProps = ComponentProps<typeof Button> & {
  status?: ChatStatus;
};

export const PromptInputSubmit = ({
  className,
  size = 'icon',
  status,
  children,
  ...props
}: PromptInputSubmitProps) => {
  let Icon = <Send className='size-4' />;

  if (status === 'submitted') {
    Icon = <Loader2Icon className='size-4 animate-spin' />;
  } else if (status === 'streaming') {
    Icon = <SquareIcon className='size-4' />;
  } else if (status === 'error') {
    Icon = <XIcon className='size-4' />;
  }

  return (
    <Button
      className={cn(
        'h-8 cursor-pointer rounded-lg bg-neutral-500 px-2 text-xl text-neutral-100 hover:bg-neutral-500 hover:text-neutral-100 disabled:opacity-70'
      )}
      size={size}
      type='submit'
      {...props}
    >
      {children ?? Icon}
    </Button>
  );
};

export type PromptInputModelSelectProps = ComponentProps<typeof Select>;

export const PromptInputModelSelect = (props: PromptInputModelSelectProps) => <Select {...props} />;

export type PromptInputModelSelectTriggerProps = ComponentProps<typeof SelectTrigger>;

export const PromptInputModelSelectTrigger = ({
  className,
  ...props
}: PromptInputModelSelectTriggerProps) => (
  <SelectTrigger
    className={cn(
      'text-muted-foreground border-none bg-transparent font-medium shadow-none transition-colors',
      'hover:bg-accent hover:text-foreground [&[aria-expanded="true"]]:bg-accent [&[aria-expanded="true"]]:text-foreground',
      className
    )}
    {...props}
  />
);

export type PromptInputModelSelectContentProps = ComponentProps<typeof SelectContent>;

export const PromptInputModelSelectContent = ({
  className,
  ...props
}: PromptInputModelSelectContentProps) => <SelectContent className={cn(className)} {...props} />;

export type PromptInputModelSelectItemProps = ComponentProps<typeof SelectItem>;

export const PromptInputModelSelectItem = ({
  className,
  ...props
}: PromptInputModelSelectItemProps) => <SelectItem className={cn(className)} {...props} />;

export type PromptInputModelSelectValueProps = ComponentProps<typeof SelectValue>;

export const PromptInputModelSelectValue = ({
  className,
  ...props
}: PromptInputModelSelectValueProps) => <SelectValue className={cn(className)} {...props} />;
