'use client'

import React from 'react'
import { ChatbotProvider } from '@/context/ChatbotContext'
import RobotMascot from './RobotMascot'
import ChatPanel from './ChatPanel'

export default function Chatbot() {
  return (
    <ChatbotProvider>
      <RobotMascot />
      <ChatPanel />
    </ChatbotProvider>
  )
}
