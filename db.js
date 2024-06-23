import path from 'path'
import { Database } from 'bun:sqlite'
import { ScanResource } from './scan-resource'

const DATABASE_PATH = path.join(process.cwd(), 'db.sqlite')

const db = new Database(DATABASE_PATH, { create: true })

// - Migrations

db.run(`
  CREATE TABLE IF NOT EXISTS "resources" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "tag" TEXT NOT NULL,
    "url" TEXT UNIQUE NOT NULL,
    "severity" TEXT NOT NULL,
    "low" INTEGER NOT NULL,
    "medium" INTEGER NOT NULL,
    "high" INTEGER NOT NULL,
    "critical" INTEGER NOT NULL,
    "end_time" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "subrepo" TEXT NOT NULL
  )
`)

// - Queries

const allResourcesQuery = db.query(`
  SELECT *, datetime(end_time) AS "end_time"
  FROM "resources"
  ORDER BY "end_time" DESC
`)

const isResourceExistsQuery = db.query('SELECT 1 FROM "resources" WHERE "url"=$url')
const deleteResourceQuery = db.query('DELETE FROM "resources" WHERE "url"=$url')
const createResourceQuery = db.query(`
  INSERT INTO "resources" (
    "url",
    "tag",
    "severity",
    "low",
    "medium",
    "high",
    "critical",
    "end_time",
    "project",
    "subrepo"
  ) VALUES (
    $url,
    $tag,
    $severity,
    $low,
    $medium,
    $high,
    $critical,
    $endTime,
    $project,
    $subrepo
  )
`)

// - Functions

/**
 * @returns {Array<ScanResource>}
 */
export const allResources = () => allResourcesQuery.all()

/**
 * @param {ScanResource} resource
 */
export const isResourceExists = resource => isResourceExistsQuery.all({ $url: resource.url }).length > 0

/**
 * @param {ScanResource} resource
 */
export const deleteResource = resource => deleteResourceQuery.run({ $url: resource.url })

/**
 * @param {ScanResource} resource
 */
export const createResource = resource => createResourceQuery.run({
  $url: resource.url,
  $tag: resource.tag,
  $severity: resource.severity,
  $low: resource.low,
  $medium: resource.medium,
  $high: resource.high,
  $critical: resource.critical,
  $endTime: resource.end_time,
  $project: resource.project,
  $subrepo: resource.subrepo
})
