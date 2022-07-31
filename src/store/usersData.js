import { faker } from '@faker-js/faker'

export const USERS = []
const HISTORY = []

export function createRandomData() {
  return {
    userId: faker.datatype.uuid(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jobType: faker.name.jobType(),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName(),
    bio: faker.lorem.sentences(4),
    history: HISTORY,
  }
}

Array.from({ length: 4 }).forEach(() => {
  HISTORY.push(faker.name.jobTitle())
})

Array.from({ length: 10 }).forEach(() => {
  const data = createRandomData()
  USERS.push({ ...data })
})

for (let i = 0; i < USERS.length; i += 2) {
  USERS[i].countries = 'Albania'
}

for (let i = 0; i < USERS.length; i += 2) {
  USERS[i].states = 'berat district'
}

for (let i = 0; i < USERS.length; i += 4) {
  USERS[i].states = 'Dibër County'
}

for (let i = 0; i < USERS.length; i += 2) {
  USERS[i].cities = 'Banaj'
}

for (let i = 0; i < USERS.length; i += 4) {
  USERS[i].cities = 'Bashkia Bulqizë'
}

for (let i = 1; i < USERS.length; i += 2) {
  USERS[i].countries = 'Algeria'
}
for (let i = 1; i < USERS.length; i += 2) {
  USERS[i].states = 'Adrar'
}

for (let i = 1; i < USERS.length; i += 4) {
  USERS[i].states = 'Aoulef'
}

const universities = [
  'Polytechnic University of Tirana',
  'Beder University',
  'American University of Tirana',
  'Agricultural University of Tirana',
  'Epoka University',
  'Polytechnic University of Tirana',
  'Beder University',
  'American University of Tirana',
  'Agricultural University of Tirana',
  'Epoka University',
]

for (let i = 0; i < USERS.length; i += 2) {
  USERS[i].universities = universities[i]
}

for (let i = 1; i < USERS.length; i += 2) {
  USERS[i].universities = universities[i]
}
