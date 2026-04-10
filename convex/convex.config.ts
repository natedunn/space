import { defineApp } from 'convex/server'
import zenComponent from './zen/component/convex.config'

const app = defineApp()

app.use(zenComponent, { name: 'zenComponent' })

export default app
