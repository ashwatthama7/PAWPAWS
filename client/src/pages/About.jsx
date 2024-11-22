import React from "react";

export default function About() {
  return (
    <main
      className="min-h-screen relative bg-cover bg-center"
      style={{
        backgroundImage: "url('https://wallpapercave.com/wp/wp7508395.jpg')",
      }}
    >
      {/* Glassmorphism container */}
      <div className="max-w-5xl mx-auto bg-white bg-opacity-60 backdrop-blur-lg shadow-lg rounded-md p- mt-10">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
          About Project Pawpaws
        </h1>
        <p className="text-gray-800 text-lg mb-4 leading-relaxed">
          <strong>Project Pawpaws</strong> is a platform designed to connect
          individuals with pets in need of adoption or care. Our mission is to
          provide a safe, accessible, and user-friendly platform for pet lovers,
          animal shelters, and stray rescue organizations to come together and
          make a positive impact in the lives of animals.
        </p>

        <section className="my-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-800 leading-relaxed">
            At Project Pawpaws, we aim to reduce the number of stray animals and
            improve their quality of life by promoting adoption, vaccination,
            and responsible pet ownership. We believe every animal deserves a
            loving home.
          </p>
        </section>

        <section className="my-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Key Features
          </h2>
          <ul className="list-disc pl-6 text-gray-800">
            <li>Easy-to-use platform for listing pets for adoption.</li>
            <li>Browse profiles of pets with detailed descriptions and images.</li>
            <li>Connect with the pet uploader directly through secure channels.</li>
            <li>Encourage vaccination and responsible pet care practices.</li>
          </ul>
        </section>

        <section className="my-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-800">
            If you have any questions, feedback, or want to contribute to the
            project, feel free to reach out to us at:
          </p>
          <p className="text-blue-600 mt-2 underline">
            <a href="mailto:support@projectpawpaws.com">
              support.pawpaws@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
