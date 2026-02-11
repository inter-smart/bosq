import React from 'react'
import BlogList from './blog-list'

export default function BlogServer({ locale, initialData }) {
  return (
    <div>
      <BlogList locale={locale} initialData={initialData} />
    </div>
  )
}
