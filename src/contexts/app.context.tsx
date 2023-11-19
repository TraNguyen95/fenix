import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isHiddenPopupConfirm: boolean
  setHiddenPopupConfirm: React.Dispatch<React.SetStateAction<boolean>>
  isConfirm: boolean
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  loading: false,
  setLoading: () => null,
  isHiddenPopupConfirm: false,
  setHiddenPopupConfirm: () => null,
  isConfirm: false,
  setIsConfirm: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<any | null>(initialAppContext.profile)
  const [loading, setLoading] = useState<boolean>(initialAppContext.loading)
  const [isConfirm, setIsConfirm] = useState<boolean>(false)
  const [isHiddenPopupConfirm, setHiddenPopupConfirm] = useState<boolean>(false)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        loading,
        setLoading,
        isHiddenPopupConfirm,
        setHiddenPopupConfirm,
        isConfirm,
        setIsConfirm
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
