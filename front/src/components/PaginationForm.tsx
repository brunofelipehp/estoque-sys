import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "react-router-dom"

interface PaginationProps {
  pages: number
  // items: number
  page: number
}

export const PaginationForm = ({ pages, page }: PaginationProps) => {

  const [, setSearchParams] = useSearchParams()

  function previousPage() {

    if (page - 1 <= 0) {
      return
    }

    setSearchParams(params => {
      params.set('page', String(page - 1))

      return params
    })
  }

  function nextPage() {
    if (page + 1 >= pages) {

    }

    setSearchParams(params => {
      params.set('page', String(page + 1))

      return params
    })
  }

  function lastPages() {
    setSearchParams(params => {
      params.set('page', String(pages))

      return params
    })
  }

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => previousPage()} disabled={page === 1} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink >1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={() => lastPages()}>
            <PaginationLink >{pages}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => nextPage()} disabled={page === pages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  )
}
