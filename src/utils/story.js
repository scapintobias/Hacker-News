import React, { useState, useEffect, memo } from 'react';
import { getStory } from './api';
import { mapTime } from './mapTime';

export const Story = memo(function Story({ storyId }) {
	const [story, setStory] = useState([]);

	useEffect(() => {
		getStory(storyId).then((data) => data && data.url && setStory(data));
	}, []);
	let baseTwitter = 'https://twitter.com/intent/tweet?text=';
	let tweet = 'Have a look at this: ';
	let newTweet = `${baseTwitter + tweet + story.url}`;
	let url = `${story.url}`;
	let res = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];

	return story && story.url ? (
		<>
			<div className='columns is-centered'>
				<div className='column is-two-thirds mx-6'>
					<div className='box'>
						<div className='content'>
							<div className='is-flex is-justify-content-space-between'>
								<div>
									By{' '}
									<strong className='is-italic is-capitalized'>
										{story.by}
									</strong>{' '}
									<small>{mapTime(story.time)} ago</small>
								</div>
								<a
									data-social-network='Twitter'
									data-social-action='tweet'
									data-social-target={story.url}
									target='_blank'
									href={newTweet}
									rel='noreferrer'>
									<span className='icon has-text-info'>
										<i className='fab fa-twitter '></i>
									</span>
								</a>
							</div>
						</div>
						<p className='pb-5'>
							<a
								className='title '
								href={story.url}
								target='blank'
								rel='noopener noreferrer'>
								{story.title}
							</a>
						</p>
						<p>
							More on <strong>{res}</strong>{' '}
						</p>
					</div>
				</div>
			</div>
		</>
	) : null;
});
