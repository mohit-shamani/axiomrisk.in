import { Link } from 'react-router-dom'
import ArticleCover from './ArticleCover'
import { formatDate } from '../lib/posts'

/**
 * Article card used on the listing page, the homepage "Latest Insights"
 * section and the "Related Insights" block. Equal height by construction:
 * flex column with the meta row pinned to the bottom via margin-top:auto.
 */
export default function ArticleCard({ post, priority = false }) {
  return (
    <article className="post-card">
      <Link to={post.path} className="post-card__media" tabIndex={-1} aria-hidden="true">
        <ArticleCover post={post} priority={priority} />
      </Link>

      <div className="post-card__body">
        <span className="post-card__tag">{post.category}</span>

        <h3 className="post-card__title">
          {/* Stretched link: the whole card is clickable, but only one link
              is exposed to assistive tech and the tab order. */}
          <Link to={post.path} className="post-card__link">{post.title}</Link>
        </h3>

        <p className="post-card__excerpt">{post.excerpt}</p>

        <div className="post-card__foot">
          <div className="post-card__meta">
            {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
            {post.date && post.readTime && <span aria-hidden="true">·</span>}
            {post.readTime && <span>{post.readTime}</span>}
          </div>
          <span className="post-card__more" aria-hidden="true">
            Read More
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" focusable="false">
              <path
                d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}
