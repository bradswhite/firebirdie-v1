import { useState, useEffect } from 'react'

import { API } from 'aws-amplify'
import { listCommentsByPostId } from '../../../graphql/queries'

import { Comment } from './Comment'

export const Timeline = ({ postId, comments, setComments }) => {
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const { data } = await API.graphql({
					query: listCommentsByPostId,
					variables: { postId }
				})
				setComments(data.listCommentsByPostId.items)
			} catch (err) {
				console.log('error fetching posts', err)
			}
		}
		fetchComments()
		// Subscribe....!!!
	}, [])
	
	return (
		<div>
			{comments.map(props => (
				<Comment {...props} />
			))}
		</div>
	)
};