import Reveal from './Reveal'

export default function SectionHeader({
  kicker,
  title,
  copy,
  align = 'center',
  light = false,
}) {
  const centered = align === 'center'
  return (
    <Reveal
      className={`w-full ${centered ? 'mx-auto max-w-3xl text-center' : 'flex flex-col justify-between gap-5 lg:flex-row lg:items-end'}`}
    >
      <div className={centered ? '' : 'max-w-xl'}>
        {kicker && (
          <p className={`ornament ${centered ? 'justify-center' : ''} ${light ? 'text-gold' : 'text-gold-dark'}`}>
            {kicker}
          </p>
        )}
          <h2
          className={`mt-4 font-sans text-3xl font-bold uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl ${
            light ? 'text-cream' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </div>
      {copy && (
        <p
          className={`text-sm leading-relaxed sm:text-base ${
            light ? 'text-cream/70' : 'text-muted'
          } ${centered ? 'mx-auto mt-4 max-w-xl' : 'max-w-md lg:text-right'}`}
        >
          {copy}
        </p>
      )}
    </Reveal>
  )
}
