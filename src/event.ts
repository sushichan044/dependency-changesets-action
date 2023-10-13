import { readFile } from 'node:fs/promises'

export interface PullRequest {
	number: number
	pull_request: {
		_links: {
			commits: { href: string }
		}
		base: {
			ref: string
			sha: string
		}
		head: {
			ref: string
			sha: string
		}
		patch_url: string
		state: 'open' | 'closed'
		title: string
	}
}

export const getEvent = async (): Promise<PullRequest> => {
	const event: object = JSON.parse((await readFile(process.env.GITHUB_EVENT_PATH!)).toString('utf-8'))

	if (!('pull_request' in event)) {
		throw new Error("Event doesn't have a pull_request available.")
	}

	return event as PullRequest
}
