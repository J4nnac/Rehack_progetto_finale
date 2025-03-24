export default function Footer() {
    return (
        <div className="text-center">
            <div className="container pt-4">
                <section className="mb-4">
                    {/* Facebook Icon */}
                    <a
                        className="btn btn-link btn-floating btn-lg text-main m-1"
                        href="https://facebook.com"
                        role="button"
                    >
                        <i className="bi bi-facebook"></i>
                    </a>

                    {/* Twitter Icon */}
                    <a

                        className="btn btn-link btn-floating btn-lg text-main m-1"
                        href="https://twitter.com"
                        role="button"

                    >
                        <i className="bi bi-twitter-x"></i>
                    </a>

                    {/* Google Icon */}
                    <a

                        className="btn btn-link btn-floating btn-lg text-main m-1"
                        href="https://google.com"
                        role="button"

                    >
                        <i className="bi bi-google"></i>
                    </a>

                    {/* Instagram Icon */}
                    <a

                        className="btn btn-link btn-floating btn-lg text-main m-1"
                        href="https://instagram.com"
                        role="button"

                    >
                        <i className="bi bi-instagram"></i>
                    </a>

                    {/* LinkedIn Icon */}
                    <a

                        className="btn btn-link btn-floating btn-lg text-main m-1"
                        href="https://www.linkedin.com/in/francescoiannacconefront-end-developer/"
                        role="button"

                    >
                        <i className="bi bi-linkedin"></i>
                    </a>

                    {/* GitHub Icon */}
                    <a

                        className="btn btn-link btn-floating btn-lg text-main m-1"
                        href="https://github.com"
                        role="button"
                    >
                        <i className="bi bi-github"></i>
                    </a>
                </section>
            </div>

            {/* Footer copyright section */}
            <div className="text-center p-3">
                © 2020 Copyright:
                <a className="ms-2 text-decoration-none text-main" href="#">
                    Iannaccone Francesco
                </a>
            </div>
        </div>
    );
}
