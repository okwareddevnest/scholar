import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/homework-helper-logo.png"
        alt="Homework Helper Logo - Three graduates reading from an open book"
        width={150}
        height={100}
        className="object-contain"
        priority
      />
    </Link>
  )
}

