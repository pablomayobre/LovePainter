import { getProviders, signIn } from "next-auth/client"

export type Providers = { providers: ReturnType<typeof getProviders> extends Promise<infer T> ? T : never }

export default function SignIn({ providers }: Providers) {
  if (!providers) return <h1>Error: No configured providers</h1>
  return (
    <>
      <img src="/heart.svg" alt="LovePainter Logo" />
      <h1>LovePainter</h1>
      {providers ? Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
        </div>
      )) : <h2>Error: Github sign in is not configured</h2>}
    </>
  )
}