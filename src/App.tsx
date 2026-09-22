import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { usePitchBridge } from './hooks/usePitchBridge'
import { Browse } from './pages/Browse'
import { IdeaDetail } from './pages/IdeaDetail'
import { Landing } from './pages/Landing'
import { SubmitIdea } from './pages/SubmitIdea'

export default function App() {
  const {
    ideas,
    role,
    displayName,
    changeRole,
    changeDisplayName,
    submitIdea,
    submitInterest,
    ideaById,
    interestsFor,
    interestCount,
  } = usePitchBridge()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout
              role={role}
              displayName={displayName}
              onRoleChange={changeRole}
              onNameChange={changeDisplayName}
            />
          }
        >
          <Route
            path="/"
            element={<Landing role={role} ideaCount={ideas.length} />}
          />
          <Route
            path="/browse"
            element={<Browse ideas={ideas} interestCount={interestCount} />}
          />
          <Route
            path="/idea/:id"
            element={
              <IdeaDetail
                getIdea={ideaById}
                getInterests={interestsFor}
                displayName={displayName}
                onInterest={submitInterest}
              />
            }
          />
          <Route
            path="/submit"
            element={
              <SubmitIdea displayName={displayName} onSubmit={submitIdea} />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
