// credits: https://themeforest.net/item/qurno-minimal-blog-nextjs-template/36625633

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'

const times = (number: number) => new Array(number).fill(null).map((_, index) => index + 1)

interface Props {
  currentPage: number
  numberOfPages: number
}

const Pagination = ({ currentPage, numberOfPages }: Props) => {
  const ITEM_WIDTH = 70
  const MIN_SUPPORTED_WIDTH = 290

  const [maxWidth, setMaxWidth] = useState(MIN_SUPPORTED_WIDTH)
  const [areArrowsVisible, setAreArrowsVisible] = useState(false)
  const [visiblePages, setVisiblePages] = useState(0)
  const [prevPartLength, setPrevPartLength] = useState(0)
  const [nextPartLength, setNextPartLength] = useState(0)
  const [pageItemWidth, setPageItemWidth] = useState(`${ITEM_WIDTH}px`)

  const setMaxWidthCallback = useCallback((event) => {
    setMaxWidth(event.target.screen.availWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', setMaxWidthCallback)

    return () => {
      window.removeEventListener('resize', setMaxWidthCallback)
    }
  }, [])

  useEffect(() => {
    if (maxWidth && numberOfPages) {
      if (currentPage > numberOfPages) {
        throw new Error('Active page cannot be higher than total number of pages')
      }

      // how many items can be displayed in pagination?
      const maxItems = Math.floor(maxWidth / ITEM_WIDTH)
      // how many items has to be minimally displayed in pagination?
      const minItems = Math.floor(MIN_SUPPORTED_WIDTH / ITEM_WIDTH)
      const areArrowsVisibleLocal =
        maxItems >= (numberOfPages < minItems ? numberOfPages : minItems) + 2
      const visiblePagesLocal = maxItems - (areArrowsVisibleLocal ? 4 : 2)
      const pivot = Math.floor(visiblePagesLocal / 2)

      setAreArrowsVisible(areArrowsVisibleLocal)
      setVisiblePages(visiblePagesLocal)
      setPrevPartLength(pivot)
      setNextPartLength(visiblePagesLocal % 2 === 1 ? pivot : pivot - 1)
      setPageItemWidth(
        numberOfPages >= visiblePagesLocal + 2
          ? `${maxWidth / maxItems - 15}px`
          : `${ITEM_WIDTH - 20}px`,
      )
    }
  }, [maxWidth, numberOfPages, currentPage])

  let ellipsisOnBeginning = true
  let ellipsisOnEnd = true
  let pagination = currentPage - prevPartLength + 1
  let totalPages = visiblePages

  if (numberOfPages - 2 <= visiblePages) {
    // no ellipsis, all pages are visible
    ellipsisOnBeginning = false
    ellipsisOnEnd = false
    totalPages = numberOfPages - 2
    pagination = 2
  } else if (numberOfPages - currentPage <= nextPartLength + 1) {
    // ellipsis just on the beginning
    ellipsisOnEnd = false
    pagination = numberOfPages - visiblePages + 1
  } else if (currentPage <= prevPartLength + 2) {
    // ellipsis just on the end
    ellipsisOnBeginning = false
    pagination = 2
  }

  if (!maxWidth || !numberOfPages || numberOfPages === 1) {
    return <></>
  }

  if (numberOfPages === 1) return <></>

  return (
    <>
      <div className="col-12">
        <nav className="text-center mt-5">
          <ul className="pagination justify-content-center border border-white rounded d-inline-flex">
            {areArrowsVisible && (
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link
                  href={`/blog/page/${currentPage - 1}`}
                  className="page-link rounded"
                  aria-label="Pagination Arrow"
                  style={{ width: pageItemWidth }}
                >
                  {`‹`}
                </Link>
              </li>
            )}
            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
              <Link
                href={`/blog/page/1`}
                className="page-link rounded"
                style={{ width: pageItemWidth }}
              >
                1
              </Link>
            </li>
            {times(totalPages).map((_, index) => {
              if (
                (ellipsisOnBeginning && index === 0) ||
                (ellipsisOnEnd && index === totalPages - 1)
              ) {
                const pageIndex =
                  ellipsisOnBeginning && index === 0
                    ? Math.ceil((1 + pagination) / 2)
                    : Math.floor((pagination + numberOfPages) / 2)
                return (
                  <li className={'page-item'}>
                    <Link
                      href={`/blog/page/${pageIndex}`}
                      className="page-link rounded"
                      style={{ width: pageItemWidth }}
                    >
                      …
                    </Link>
                  </li>
                )
              }

              const item = (
                <li className={`page-item ${currentPage === pagination ? 'active' : ''}`} key={index}>
                  <Link
                    href={`/blog/page/${pagination}`}
                    className="page-link rounded"
                    style={{ width: pageItemWidth }}
                  >
                    {pagination}
                  </Link>
                </li>
              )

              pagination += 1
              return item
            })}
            {numberOfPages > 1 && (
              <li className={`page-item ${currentPage === numberOfPages ? 'active' : ''}`}>
                <Link
                  href={`/blog/page/${numberOfPages}`}
                  className="page-link rounded"
                  style={{ width: pageItemWidth }}
                >
                  {numberOfPages}
                </Link>
              </li>
            )}
            {areArrowsVisible && (
              <li className={`page-item ${currentPage === numberOfPages ? 'disabled' : ''}`}>
                <Link
                  href={`/blog/page/${currentPage + 1}`}
                  className="page-link rounded"
                  aria-label="Pagination Arrow"
                  style={{ width: pageItemWidth }}
                >
                  {`›`}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}

export { Pagination }
