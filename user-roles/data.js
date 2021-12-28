const ROLE = {
    ADMIN : 'admin',
    BASIC : 'basic'
}
    
const users = [
    {id: 1, name: 'adham', role: ROLE.ADMIN},
    {id: 2, name: 'asmaa', role: ROLE.BASIC},
    {id: 3, name: 'zahraa', role: ROLE.BASIC}
]

const projects = [
    {id: 1, userId: 1, title: "adham's project"},
    {id: 2, userId: 2, title: "asmaa's project"},
    {id: 3, userId: 3, title: "zahraa's project"}
]

module.exports = {
    ROLE,
    users,
    projects
}