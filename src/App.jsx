import { useEffect, useState } from "react";
import Comment from "./components/Comment";
import pizza from "./assets/pizza.jpg";

function App() {
  // api="https://react-mini-projects-api.classbon.com/Comments/1"
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastElement, setLastElement] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData();
  }, [page])

  useEffect(() => {
    if (lastElement) {
      observerRef.observe(lastElement)
    }

    return () => {
      if (lastElement) {
        observerRef.unobserve(lastElement)
      }
    }
  }, [lastElement])


  const observerRef = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setPage(previousPage => previousPage + 1)
    }
  })

  async function fetchData() {
    setLoading(true)
    const response = await fetch(`https://react-mini-projects-api.classbon.com/Comments/${page}`)
    const data = await response.json();
    if (data.length === 0) {
      setLastElement(null)
    } else {
      setComments(previousData => [...previousData, ...data])
    }
    setLoading(false)
  }

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={pizza} />
        </div>
        <div className="col-md-6 pt-4">
          <div className="product-details pb-3">
            <div className="mb-3">
              <span className="h3 fw-normal text-accent">
                قیمت: 158,000
              </span>
            </div>
            <form className="mb-grid-gutter">
              <div className="row mx-n2">
                <div className="col-6 px-2">
                  <div className="mb-3">
                    <label className="form-label">
                      اندازه:
                    </label>
                    <select className="form-select">
                      <option value="small">کوچک</option>
                      <option value="medium">متوسط</option>
                      <option value="large">بزرگ</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">
                      تعداد:
                    </label>
                    <select className="form-select">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-info btn-shadow d-block w-100"
                type="submit"
              >
                افزودن به سبد خرید
              </button>

            </form>
            <h5 className="h6 mb-3 pb-3 border-bottom">
              پیتزا استیک (یک نفره)
            </h5>
            <h6 className="fs-sm mb-2">ترکیبات:</h6>
            <p className="fs-sm">
              خمیر پیتزا کلاسیک ۲۶ سانتی متری، استیک فیله گوشت، پنیر، قارچ، فلفل
              دلمه ای، سس کچاپ مخصوص
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 pt-5">
          {
            comments.map(comment => (
              <div key={comment.id} ref={setLastElement}>
                <Comment {...comment} />
              </div>
            ))
          }
          {loading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
