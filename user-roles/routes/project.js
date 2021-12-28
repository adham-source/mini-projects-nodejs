const express = require('express')
const router = express.Router()
const { projects } = require('../data')
const { authUser } = require('../controller/basicAuth')
const { canViewProject, canDeleteProject ,scopedProjects } = require('../controller/permissionProject')

router.get('/', authUser, (req, res) => {
    res.json(scopedProjects(req.user, projects))
})

router.get('/:id', setProject, authUser, authGetProject, (req, res) => {
    res.json(req.project)
})

router.delete('/:id', setProject, authUser, authDeleteProject, (req, res) => {
    res.send('Deleted project')
})

function setProject(req, res ,next) {
    const id = parseInt(req.params.id)
    req.project = projects.find(project => project.id === id)
    if(req.project == null) {
        res.status(404)
        return res.send('Project no found')
    }
    next()
}

function authGetProject(req, res, next) {
    if(!canViewProject(req.user, req.project)) {
        res.status(401)
        return res.send('Not allowed')
    }
    next()
}

function authDeleteProject(req, res, next) {
    if(!canDeleteProject(req.user, req.project)) {
        res.status(401)
        return res.send('Not allowed')
    }
    next()
}

module.exports = router