'use client'
import type { ReactNode } from 'react'
import { RootProvider } from 'fumadocs-ui/provider'
// your custom dialog
import SearchDialog from '@/components/search'

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog,
      }}
    >
      {children}
    </RootProvider>
  )
}
