'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Send, ChevronDown, X, Check, Square } from 'lucide-react';
import { categories, priorities, getPriorityColor, Midfooter } from '@/constants/chat_tools';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import AnimatedText from '../micro-interactions/Animatedtext';

const ChatInput = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: async (prompt: string) => {
      const res = await api.post('/api/chat', { prompt });
      return res.data;
    },
  });

  const handleCategorySelect = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handlePrioritySelect = (value: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const removeCategoryTag = (value: string) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== value));
  };

  const removePriorityTag = (value: string) => {
    setSelectedPriorities((prev) => prev.filter((item) => item !== value));
  };

  const handleStop = () => {};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      mutate(prompt);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className={`${data ? 'fixed bottom-2 mx-auto' : ''} w-full max-w-3xl`}>
        <Card className="border border-slate-200 bg-white shadow-sm dark:bg-neutral-950">
          <div className="p-6 outline-none">
            {/* Selected Tags */}
            {(selectedCategories.length > 0 || selectedPriorities.length > 0) && (
              <div className="mb-4 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((value) => {
                    const category = categories.find((c) => c.value === value);
                    if (!category) return null;
                    const Icon = category.icon;
                    return (
                      <Badge
                        key={value}
                        variant="secondary"
                        className="border border-slate-200 bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200"
                      >
                        <Icon className="mr-1 h-3 w-3" />
                        {category.label}
                        <button
                          onClick={() => removeCategoryTag(value)}
                          className="ml-1 rounded-full p-0.5 transition-colors hover:bg-slate-300"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </Badge>
                    );
                  })}
                  {selectedPriorities.map((value) => {
                    const priority = priorities.find((p) => p.value === value);
                    if (!priority) return null;
                    return (
                      <Badge
                        key={value}
                        variant="outline"
                        className={`${getPriorityColor(value)} transition-colors`}
                      >
                        {priority.label}
                        <button
                          onClick={() => removePriorityTag(value)}
                          className="ml-1 rounded-full p-0.5 transition-colors hover:bg-black/10"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste a GitHub PR URL"
                className="min-h-[80px] resize-none rounded-lg border-slate-100 bg-white text-slate-900 placeholder:text-neutral-500 dark:bg-neutral-950 dark:text-white dark:placeholder:text-neutral-500"
              />
            </div>

            {/* Controls */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Category Selector */}
                <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-slate-200 bg-white text-xs text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300"
                    >
                      Filter
                      {selectedCategories.length > 0 && (
                        <Badge className="ml-1 lg:h-4 lg:w-4 rounded-full bg-neutral-900 dark:bg-neutral-100 pt-[3px] text-xs text-neutral-100 dark:text-neutral-900">
                          {selectedCategories.length}
                        </Badge>
                      )}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search categories..." className="h-8 text-xs" />
                      <CommandList className="max-h-48">
                        <CommandEmpty className="p-2 text-xs text-slate-500">
                          No categories found.
                        </CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => {
                            const Icon = category.icon;
                            const isSelected = selectedCategories.includes(category.value);
                            return (
                              <CommandItem
                                key={category.value}
                                onSelect={() => handleCategorySelect(category.value)}
                                className="flex cursor-pointer items-center gap-2 px-2 py-1.5 text-xs"
                              >
                                <Icon className="h-3.5 w-3.5 text-slate-500" />
                                <span className="flex-1">{category.label}</span>
                                {isSelected && <Check className="h-3 w-3 text-slate-900" />}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Priority Selector */}
                <Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-slate-200 bg-white text-xs text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300"
                    >
                      Extras
                      {selectedPriorities.length > 0 && (
                        <Badge className="ml-1 h-4 bg-slate-900 px-1 text-xs text-white">
                          {selectedPriorities.length}
                        </Badge>
                      )}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0" align="start">
                    <Command>
                      <CommandList className="max-h-32">
                        <CommandGroup>
                          {priorities.map((priority) => {
                            const isSelected = selectedPriorities.includes(priority.value);
                            return (
                              <CommandItem
                                key={priority.value}
                                onSelect={() => handlePrioritySelect(priority.value)}
                                className="flex cursor-pointer items-center justify-between px-2 py-1.5 text-xs"
                              >
                                <span
                                  className={`rounded px-2 py-0.5 text-xs ${getPriorityColor(priority.value)}`}
                                >
                                  {priority.label}
                                </span>
                                {isSelected && <Check className="h-3 w-3 text-slate-900" />}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs text-neutral-800 dark:text-neutral-300">
                  {prompt.length > 0 && `${prompt.length} characters`}
                </div>

                {/* Send/Stop Button */}
                {isPending ? (
                  <Button
                    onClick={handleStop}
                    size="sm"
                    variant="outline"
                    className="h-8 border-red-200 bg-red-50 px-3 text-xs text-red-700 hover:bg-red-100"
                  >
                    <Square className="fill-current" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => mutate(prompt)}
                    disabled={!prompt.trim()}
                    size="sm"
                    className="h-8 cursor-pointer bg-neutral-950 px-3 text-xs hover:bg-neutral-900 disabled:opacity-70 dark:bg-neutral-50 hover:dark:bg-neutral-100"
                  >
                    <Send className="mr-[2px] text-neutral-50 dark:text-neutral-950" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className={`mt-3 flex items-center justify-center gap-2 ${data ? 'hidden': ''} `}>
          {Midfooter.map((el, idx) => (
            <Button
              key={idx}
              variant="ghost"
              size="sm"
              className="h-7 cursor-pointer text-[13px] text-neutral-700 hover:text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-400"
              onClick={() => setPrompt(el.do)}
            >
              {el.name}
            </Button>
          ))}
        </div>
      </div>
      {isSuccess && (
            <div className="text-justify lg:max-w-[780px] mx-auto w-full bg-red-300 lg:mt-[20px] ">
            <div className=" text-neutral-950">
              <AnimatedText
                text={data.bodyy}
                classname='"text-[10px] leading-tight font-light tracking-tighter md:text-xl lg:text-[16px] lg:leading-[1.1]"'
                blur='8px'
                stg={0.06}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default ChatInput;
