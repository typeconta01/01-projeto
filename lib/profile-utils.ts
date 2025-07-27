import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function ensureProfileExists(userEmail: string, userId?: string) {
  try {
    console.log('🔍 Verificando se perfil existe para:', userEmail)

    // Verificar se o perfil já existe
    const { data: existingProfile, error: selectError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 = "no rows returned", outros erros são problemas reais
      console.error('❌ Erro ao verificar perfil:', selectError)
      throw selectError
    }

    if (!existingProfile) {
      console.log('📝 Criando perfil para:', userEmail)
      
      // Criar o perfil automaticamente
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            email: userEmail,
            id: userId, // se tiver o id
            pagamento_pix: false,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single()

      if (insertError) {
        console.error('❌ Erro ao criar perfil:', insertError)
        throw insertError
      }

      console.log('✅ Perfil criado com sucesso:', newProfile)
      return newProfile
    }

    console.log('✅ Perfil já existe:', existingProfile)
    return existingProfile
  } catch (error) {
    console.error('💥 Erro ao garantir perfil:', error)
    throw error
  }
}

export async function getUserProfile(userEmail: string) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (error) {
      console.error('❌ Erro ao buscar perfil:', error)
      return null
    }

    return profile
  } catch (error) {
    console.error('💥 Erro ao buscar perfil:', error)
    return null
  }
} 