import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { cn } from '@/src/lib/utils';

const AccordionRoot = Accordion.Root;

const AccordionItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Item
      className={cn(
        'mt-px overflow-hidden first:mt-0 focus-within:relative focus-within:z-10',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
)

AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cn('group', className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  )
)

AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={cn(
        'overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="">{children}</div>
    </Accordion.Content>
  )
)

AccordionContent.displayName = "AccordionContent"

export { AccordionItem, AccordionTrigger, AccordionContent,AccordionRoot }
