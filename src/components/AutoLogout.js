import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from 'src/redux/auth/auth.action'
import { toast } from 'src/redux/toast/toast.action'

const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']

const AutoLogout = ({ children }) => {
  let timer
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer()
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer)
      })
      // logs out user
      logoutAction()
    }, 3600000) // 3600000ms = 3600secs.
  }

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer()
        handleLogoutTimer()
      })
    })
  }, [])

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer)
  }

  const logoutAction = (e) => {
    // e.preventDefault()

    localStorage.removeItem('admin_token')
    logout({}, dispatch)
    navigate('/login')
    toast(
      {
        message: 'Logget out due to in-activity',
        type: 'success',
      },
      dispatch,
    )
  }

  return children
}

export default AutoLogout
