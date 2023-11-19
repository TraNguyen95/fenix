import { useState } from 'react'
import IconDelete from '../ui/IconDelete'

const CardCollapse = ({ header, content, className, children, handleDelete }: any) => {
  const [hidden, setHiden] = useState<boolean>(false)
  const handleCollapse = (e: any) => {
    e.preventDefault()
    setHiden(!hidden)
  }
  return (
    <div className='flex w-full gap-2'>
      <div className={className + ' border-indigo-600 relative mb-2 w-full rounded-md border border-stroke'}>
        <a
          className='absolute right-2 top-3 cursor-pointer text-[32px] text-white caret-transparent'
          onClick={handleCollapse}
        >
          {hidden ? '+' : '-'}
        </a>
        <div
          className={
            'header cursor-pointer bg-[#3b50e0] py-4 px-2 font-semibold uppercase text-[#fff] caret-transparent' +
            (!hidden ? ' border-b' : '')
          }
          onClick={handleCollapse}
        >
          {header}
        </div>
        <div className={'content py-2 ' + (hidden && 'hidden')}>{children}</div>
      </div>
      <button className='fhover:text-primary' onClick={handleDelete}>
        <IconDelete />
      </button>
    </div>
  )
}

export default CardCollapse
