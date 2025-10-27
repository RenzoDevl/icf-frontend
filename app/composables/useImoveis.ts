// composables/useImoveis.ts
export type Imovel = {
  id: number
  tipo: string
  bairro: string
  titulo: string
  preco: number
  area: number
  quartos: number
  banheiros: number
  vagas: number
  status: 'COMPRAR' | 'ALUGAR' | string
  capa: string
}

export const useImoveis = () => {
  const list = useState<Imovel[]>('imoveis', () => [
    {
      id: 1,
      tipo: 'Apartamento',
      bairro: 'Parque Piauí • Teresina',
      titulo: 'Apartamento de Luxo com Vista Panorâmica',
      preco: 450000,
      area: 120,
      quartos: 3,
      banheiros: 2,
      vagas: 2,
      status: 'COMPRAR',
      capa: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop'
    },
    {
      id: 2,
      tipo: 'Apartamento',
      bairro: 'Joia • Timon',
      titulo: 'Apartamento de Luxo com Vista Panorâmica',
      preco: 450000,
      area: 120,
      quartos: 3,
      banheiros: 2,
      vagas: 2,
      status: 'COMPRAR',
      capa: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop'
    },
    {
      id: 3,
      tipo: 'Sala Comercial',
      bairro: 'Centro • Teresina',
      titulo: 'Sala Comercial no Centro Empresarial',
      preco: 320000,
      area: 85,
      quartos: 1,
      banheiros: 1,
      vagas: 2,
      status: 'COMPRAR',
      capa: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop'
    }
  ])

  const findById = (id: number) => list.value.find(i => i.id === id)

  return { list, findById }
}
