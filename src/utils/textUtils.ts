import { AccountId } from '@polkadot/types/interfaces'

export const shortcutText = (text: string) => {
  // Cut it to the first and last 5 symbols
  const [_, start, end] = /^(.{5}).*(.{5})$/.exec(text) || []
  return start && end ? `${start}...${end}` : text
}

export const formatAmount = (amount: number) => {
  if (!amount) return '0'
  const parts = amount.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
