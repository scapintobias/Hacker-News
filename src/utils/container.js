import React, { useState, useEffect } from 'react';
import { getStoryIds } from './api';
import { Story } from './story';
import { useInfiniteScroll } from './useInfiniteScroll';

export const StoriesContainer = () => {
	const { count } = useInfiniteScroll();
	const [storyIds, setStoryIds] = useState([]);

	useEffect(() => {
		getStoryIds().then((data) => setStoryIds(data));
	}, []);

	return (
		<>
			<div className='hero is-medium is-success'>
				<div className='columns is-centered'>
					<div className='column is-two-thirds '>
						<div className='is-size-1 title my-6'>Hacker News</div>
					</div>
				</div>
			</div>
			<div className='my-4 mx-4'>
				{storyIds.slice(0, count).map((storyId) => (
					<Story key={storyId} storyId={storyId} />
				))}
			</div>
		</>
	);
};
