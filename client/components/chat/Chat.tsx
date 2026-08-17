'use client';

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { BACKEND_URL } from '@/config/config';
import { Response } from '@/components/ai-elements/response';
import { Source, Sources, SourcesContent, SourcesTrigger } from '@/components/ai-elements/source';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';
import { insights, mode } from '@/constants/chat_tools';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, MessageSquare, Plus, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { HostGrotesk } from '@/utils/fonts';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

const AIChat = () => {
  const [input, setInput] = useState('');
  const [selectedInsights, setSelectedInsights] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<string[]>([]);
  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({ api: `${BACKEND_URL}/api/chat` }),
  });

  const dedupedMessages = messages.filter(
    (message, index, arr) => arr.findIndex((m) => m.id === message.id) === index
  );

  const hasStarted =
    messages.length > 0 || status === 'submitted' || status === 'streaming' || status === 'error';

  const handleInsightsSelect = (newValue: string) => {
    setSelectedInsights((value) => (newValue !== value[0] ? [newValue] : []));
  };

  const handleModeSelect = (newValue: string) => {
    setSelectedMode((value) => (newValue !== value[0] ? [newValue] : []));
  };

  const removeInsightsTag = (value: string) => {
    setSelectedInsights((prev) => prev.filter((item) => item !== value));
  };

  const removeModeTag = (value: string) => {
    setSelectedMode((prev) => prev.filter((item) => item !== value));
  };

  const { data } = useQuery({
    queryKey: ['checksignedin'],
    queryFn: async () => {
      const response = await api.get('/api/checkvalidsession');
      return response.data;
    },
    staleTime: 10000 * 60 * 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(
        { text: input },
        {
          body: {
            text: input,
            messages: [
              {
                id: 'msg-1',
                role: 'user',
                selectedInsights: selectedInsights,
                selectedMode: selectedMode,
                parts: [
                  {
                    type: 'text',
                    text: input,
                  },
                ],
              },
            ],
          },
        }
      );
      setInput('');
    }
  };

  return (
    <div className={cn('flex h-full flex-col', !hasStarted && 'items-center justify-center')}>
      {hasStarted && (
        <Conversation className='min-h-0 flex-1'>
          <ConversationContent>
            {dedupedMessages.map((message) => (
              <div key={message.id}>
                {message.role === 'assistant' && (
                  <Sources>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'source-url':
                          return (
                            <>
                              <SourcesTrigger
                                count={
                                  message.parts.filter((part) => part.type === 'source-url').length
                                }
                              />
                              <SourcesContent key={`${message.id}-${i}`}>
                                <Source
                                  key={`${message.id}-${i}`}
                                  href={part.url}
                                  title={part.url}
                                />
                              </SourcesContent>
                            </>
                          );
                      }
                    })}
                  </Sources>
                )}
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case 'text':
                          return <Response key={`${message.id}-${i}`}>{part.text}</Response>;
                        case 'reasoning':
                          return (
                            <Reasoning
                              key={`${message.id}-${i}`}
                              className='w-full'
                              isStreaming={status === 'streaming'}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              </div>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      )}
      {messages.length === 0 && (
        <div className={cn('pb-4 text-2xl lg:pb-8 lg:text-4xl', HostGrotesk)}>
          Hey {data?.success ? data?.name : 'There'}, Ready for review?
        </div>
      )}
      <PromptInput
        onSubmit={handleSubmit}
        className={cn(hasStarted && 'sticky bottom-4 mt-4')}
      >
        <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input} />
        <PromptInputToolbar>
          <PromptInputTools>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 cursor-pointer rounded-full text-neutral-300 ring-0 outline-none hover:bg-neutral-700! hover:text-neutral-300 focus-visible:ring-0'
                >
                  <Plus className='size-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='bottom'
                align='start'
                className='min-w-40 border-neutral-700 bg-neutral-900 text-neutral-100'
              >
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className='cursor-pointer gap-2 text-sm focus:bg-neutral-800 focus:text-neutral-100 data-[state=open]:bg-neutral-800 data-[state=open]:text-neutral-100'>
                    <MessageSquare className='size-3.5 text-neutral-50' />
                    Insights
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent sideOffset={6} className='min-w-44 border-neutral-700 bg-neutral-900 text-neutral-100'>
                    {insights.map((insight) => {
                      const Icon = insight.icon;
                      const isSelected = selectedInsights.includes(insight.value);
                      return (
                        <DropdownMenuItem
                          key={insight.value}
                          onSelect={() => handleInsightsSelect(insight.value)}
                          className='cursor-pointer gap-2 text-sm text-neutral-100 focus:bg-neutral-800 focus:text-neutral-100'
                        >
                          <Icon className='size-3.5 text-neutral-50' />
                          <span className='flex-1'>{insight.label}</span>
                          {isSelected && <Check className='size-3 text-neutral-100' />}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className='cursor-pointer gap-2 text-sm focus:bg-neutral-800 focus:text-neutral-100 data-[state=open]:bg-neutral-800 data-[state=open]:text-neutral-100'>
                    <SlidersHorizontal className='size-3.5 text-neutral-50' />
                    Mode
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent sideOffset={6} className='min-w-44 border-neutral-700 bg-neutral-900 text-neutral-100'>
                    {mode.map((item) => {
                      const isSelected = selectedMode.includes(item.value);
                      return (
                        <DropdownMenuItem
                          key={item.value}
                          onSelect={() => handleModeSelect(item.value)}
                          className='cursor-pointer gap-2 text-sm text-neutral-100 focus:bg-neutral-800 focus:text-neutral-100'
                        >
                          <item.icon className='size-3.5 text-neutral-50' />
                          <span className='flex-1'>{item.label}</span>
                          {isSelected && <Check className='size-3 text-neutral-100' />}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedInsights.map((value) => {
              const insight = insights.find((c) => c.value === value);
              if (!insight) return null;
              return (
                <button
                  key={value}
                  onClick={() => removeInsightsTag(value)}
                  className='flex h-7 cursor-pointer items-center gap-1 rounded-full bg-neutral-700/70 px-3 text-xs text-neutral-200 transition-colors hover:bg-neutral-700'
                  title={`Remove ${insight.label}`}
                >
                  {insight.label}
                  <X className='size-3' />
                </button>
              );
            })}
            {selectedMode.map((value) => {
              const item = mode.find((p) => p.value === value);
              if (!item) return null;
              return (
                <button
                  key={value}
                  onClick={() => removeModeTag(value)}
                  className='flex h-7 cursor-pointer items-center gap-1 rounded-full bg-neutral-700/70 px-3 text-xs text-neutral-200 transition-colors hover:bg-neutral-700'
                  title={`Remove ${item.label}`}
                >
                  {item.label}
                  <X className='size-3' />
                </button>
              );
            })}
          </PromptInputTools>
          <PromptInputSubmit disabled={!input} status={status} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};

export default AIChat;
