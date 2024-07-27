import { UserGender } from '@/enum/user'

export function UserGenderFilter(value) {
  return UserGender[value] || ''
}
