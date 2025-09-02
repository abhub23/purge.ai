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
import { Badge } from '../ui/badge';
import { insights, mode } from '@/constants/chat_tools';
import { getModeColor } from '@/constants/chat_tools';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, X, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { HostGrotesk } from '@/utils/fonts';

const AIChat = () => {
  const [input, setInput] = useState('');
  const [selectedInsights, setSelectedInsights] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<string[]>([]);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [modeOpen, setModeOpen] = useState(false);
  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({ api: `${BACKEND_URL}/api/chat` }),
  });

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
                parts: [
                  {
                    type: 'text',
                    text: input,
                  },
                ],
              },
            ],
          }
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
            {messages.map((message) => (
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
          Hey There, How's it going?
        </div>
      )}
      <PromptInput
        onSubmit={handleSubmit}
        className={cn(hasStarted && 'sticky bottom-4 mt-4 bg-neutral-900')}
      >
        {(selectedInsights.length > 0 || selectedMode.length > 0) && (
          <div className='mb-4 p-2'>
            <div className='flex flex-wrap gap-2'>
              {selectedInsights.map((value) => {
                const insight = insights.find((c) => c.value === value);
                if (!insight) return null;
                const Icon = insight.icon;
                return (
                  <Badge
                    key={value}
                    variant='secondary'
                    className='border border-slate-200 bg-slate-100 text-[11px] text-neutral-700'
                  >
                    <Icon className='mr-[2px] h-3 w-3' />
                    {insight.label}
                    <button
                      onClick={() => removeInsightsTag(value)}
                      className='ml-[2px] rounded-full p-0.5 transition-colors hover:bg-neutral-400'
                    >
                      <X className='size-2.5' />
                    </button>
                  </Badge>
                );
              })}
              {selectedMode.map((value) => {
                const priority = mode.find((p) => p.value === value);
                if (!priority) return null;
                return (
                  <Badge
                    key={value}
                    variant='outline'
                    className={cn('text-[11px] transition-colors', getModeColor(value))}
                  >
                    {priority.label}
                    <button
                      onClick={() => removeModeTag(value)}
                      className='ml-[2px] rounded-full p-0.5 transition-colors hover:bg-black/10'
                    >
                      <X className='size-2.5' />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input} />
        <PromptInputToolbar>
          <PromptInputTools>
            <div className='ml-2 flex items-center gap-2'>
              {/* Insights Selector */}
              <Popover open={insightsOpen} onOpenChange={setInsightsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-8 border-neutral-500 bg-neutral-900 text-xs hover:bg-neutral-900/90 hover:text-neutral-300'
                  >
                    Insights
                    {/* {selectedInsights.length > 0 && (
                      <Badge className='ml-1 h-4 bg-neutral-100 px-1 text-xs text-neutral-700'>
                        {selectedInsights.length}
                      </Badge>
                    )} */}
                    <ChevronDown className='ml-1 h-3 w-3' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-64 p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Search...' className='h-8 text-xs' />
                    <CommandList className='max-h-48'>
                      <CommandEmpty className='p-2 text-xs text-neutral-100'>
                        No categories found.
                      </CommandEmpty>
                      <CommandGroup>
                        {insights.map((insight) => {
                          const Icon = insight.icon;
                          const isSelected = selectedInsights.includes(insight.value);
                          return (
                            <CommandItem
                              key={insight.value}
                              onSelect={() => {
                                handleInsightsSelect(insight.value);
                              }}
                              className='flex cursor-pointer items-center gap-2 px-2 py-1.5 text-xs'
                            >
                              <Icon className='h-3.5 w-3.5 text-neutral-50' />
                              <span className='flex-1'>{insight.label}</span>
                              {isSelected && <Check className='h-3 w-3 text-neutral-100' />}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Priority Selector */}
              <Popover open={modeOpen} onOpenChange={setModeOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-8 border-neutral-500 bg-neutral-900 text-xs hover:bg-neutral-900/90 hover:text-neutral-300'
                  >
                    Mode
                    {/* {selectedMode.length > 0 && (
                      <Badge className='ml-1 h-4 bg-neutral-100 px-1 text-xs text-neutral-700'>
                        {selectedMode.length}
                      </Badge>
                    )} */}
                    <ChevronDown className='ml-1 h-3 w-3' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-48 p-0' align='start'>
                  <Command>
                    <CommandList className='max-h-32'>
                      <CommandGroup>
                        {mode.map((mode) => {
                          const isSelected = selectedMode.includes(mode.value);
                          return (
                            <CommandItem
                              key={mode.value}
                              onSelect={() => handleModeSelect(mode.value)}
                              className='flex cursor-pointer items-center justify-between px-2 py-1.5 text-xs'
                            >
                              <span
                                className={cn('rounded px-2 py-0.5 text-xs', getModeColor(mode.value))}
                              >
                                {mode.label}
                              </span>
                              {isSelected && <Check className='h-3 w-3 text-neutral-100' />}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </PromptInputTools>
          <PromptInputSubmit disabled={!input} status={status} />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};

export default AIChat;
