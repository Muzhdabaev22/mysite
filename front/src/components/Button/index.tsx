import cn from 'classnames'
import css from './index.module.scss'
import { Link } from 'react-router-dom';

type ButtonColor = 'red' | 'green'

export type ButtonProps = { children: React.ReactNode; loading?: boolean; color?: ButtonColor;
  type?: 'button' | 'submit'; disabled?: boolean; onClick?: () => void
 }
export const Button = ({ children, loading = false, color = 'green', type='submit', disabled, onClick }: ButtonProps) => {
  return (
    <button className={cn({ [css.button]: true, [css.disabled]: disabled || loading, [css.loading]: loading, [css[`color-${color}`]]: true })} type={type} disabled={loading || loading} onClick={onClick}>
      <span className={css.text}>{children}</span>
    </button>
  )
}

export const LinkButton = ({children, to, color = 'green'}: {children: React.ReactNode; to: string; color?: ButtonColor}) => {
  return (
    <Link className={cn({ [css.button]: true, [css[`color-${color}`]]: true })} to={to}>{children}</Link>
  )
}

export const Buttons = ({ children }: { children: React.ReactNode}) => {
  return <div className={css.buttons}>{children}</div>
}