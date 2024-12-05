import { Lora, Montserrat } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lora',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
})

export { lora, montserrat }