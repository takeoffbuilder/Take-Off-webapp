"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { BookOpen, Download, Lock, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import FooterNavigation from "@/components/footer-navigation"

interface Course {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  estimatedTime: string
  pdfUrl: string
}

interface DownloadedCourse {
  courseId: string
  downloadedAt: string
  title: string
}

const courses: Course[] = [
  {
    id: "course-1",
    title: "Credit Score Fundamentals",
    description: "Learn the basics of credit scores, how they're calculated, and what factors affect them most.",
    category: "Credit Basics",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    pdfUrl: "/courses/credit-score-fundamentals.pdf",
  },
  {
    id: "course-2",
    title: "Building Credit from Scratch",
    description: "Step-by-step guide for establishing credit history when you have no credit background.",
    category: "Credit Building",
    difficulty: "Beginner",
    estimatedTime: "45 min",
    pdfUrl: "/courses/building-credit-from-scratch.pdf",
  },
  {
    id: "course-3",
    title: "Understanding Credit Reports",
    description: "How to read your credit report, identify errors, and dispute inaccuracies effectively.",
    category: "Credit Management",
    difficulty: "Intermediate",
    estimatedTime: "40 min",
    pdfUrl: "/courses/understanding-credit-reports.pdf",
  },
  {
    id: "course-4",
    title: "Debt Management Strategies",
    description: "Proven methods for paying down debt efficiently and avoiding common pitfalls.",
    category: "Debt Management",
    difficulty: "Intermediate",
    estimatedTime: "50 min",
    pdfUrl: "/courses/debt-management-strategies.pdf",
  },
  {
    id: "course-5",
    title: "Personal Budgeting Mastery",
    description: "Create and maintain a budget that works for your lifestyle and financial goals.",
    category: "Personal Finance",
    difficulty: "Beginner",
    estimatedTime: "35 min",
    pdfUrl: "/courses/personal-budgeting-mastery.pdf",
  },
  {
    id: "course-6",
    title: "Emergency Fund Planning",
    description: "How to build and maintain an emergency fund that protects your financial stability.",
    category: "Savings",
    difficulty: "Beginner",
    estimatedTime: "25 min",
    pdfUrl: "/courses/emergency-fund-planning.pdf",
  },
  {
    id: "course-7",
    title: "Investment Basics for Beginners",
    description: "Introduction to investing, risk management, and building long-term wealth.",
    category: "Investing",
    difficulty: "Intermediate",
    estimatedTime: "60 min",
    pdfUrl: "/courses/investment-basics-beginners.pdf",
  },
  {
    id: "course-8",
    title: "Credit Card Optimization",
    description: "Maximize credit card benefits while avoiding debt and maintaining good credit health.",
    category: "Credit Management",
    difficulty: "Intermediate",
    estimatedTime: "40 min",
    pdfUrl: "/courses/credit-card-optimization.pdf",
  },
  {
    id: "course-9",
    title: "Home Buying Financial Preparation",
    description: "Financial steps to prepare for homeownership, including credit requirements and saving strategies.",
    category: "Major Purchases",
    difficulty: "Advanced",
    estimatedTime: "55 min",
    pdfUrl: "/courses/home-buying-preparation.pdf",
  },
  {
    id: "course-10",
    title: "Retirement Planning Essentials",
    description: "Long-term financial planning strategies for a secure retirement future.",
    category: "Retirement",
    difficulty: "Advanced",
    estimatedTime: "65 min",
    pdfUrl: "/courses/retirement-planning-essentials.pdf",
  },
]

export default function MyCoursesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [availableDownloads, setAvailableDownloads] = useState(0)
  const [downloadedCourses, setDownloadedCourses] = useState<DownloadedCourse[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    if (!authData) {
      router.push("/signin")
      return
    }

    // Calculate available downloads based on boost plans
    const calculateAvailableDownloads = () => {
      let downloads = 0

      // Check main plan (always gives 1 download)
      const mainPlanData = localStorage.getItem("takeoff_selected_plan")
      if (mainPlanData) {
        downloads += 1
      }

      // Check boost plans
      const subscriptionsData = localStorage.getItem("takeoff_subscriptions")
      if (subscriptionsData) {
        const boostPlans = JSON.parse(subscriptionsData).filter(
          (sub: any) => sub.status === "active" && sub.planType !== "main-plan",
        )
        downloads += boostPlans.length
      }

      return downloads
    }

    // Load downloaded courses
    const loadDownloadedCourses = () => {
      const downloaded = localStorage.getItem("takeoff_downloaded_courses")
      if (downloaded) {
        setDownloadedCourses(JSON.parse(downloaded))
      }
    }

    setAvailableDownloads(calculateAvailableDownloads())
    loadDownloadedCourses()
    setIsLoading(false)
  }, [router])

  const handleDownload = (course: Course) => {
    // Check if user has available downloads
    if (downloadedCourses.length >= availableDownloads) {
      alert("You have reached your download limit. Purchase more Boost Plans to unlock additional courses.")
      return
    }

    // Check if course is already downloaded
    if (downloadedCourses.some((dc) => dc.courseId === course.id)) {
      alert("You have already downloaded this course.")
      return
    }

    // Simulate PDF download
    const link = document.createElement("a")
    link.href = course.pdfUrl
    link.download = `${course.title.replace(/\s+/g, "-").toLowerCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Mark course as downloaded
    const newDownload: DownloadedCourse = {
      courseId: course.id,
      downloadedAt: new Date().toISOString(),
      title: course.title,
    }

    const updatedDownloads = [...downloadedCourses, newDownload]
    setDownloadedCourses(updatedDownloads)
    localStorage.setItem("takeoff_downloaded_courses", JSON.stringify(updatedDownloads))
  }

  const isDownloaded = (courseId: string) => {
    return downloadedCourses.some((dc) => dc.courseId === courseId)
  }

  const canDownload = (courseId: string) => {
    return !isDownloaded(courseId) && downloadedCourses.length < availableDownloads
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAuth={false} />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
            <p className="text-gray-600">
              Credit and Personal Finance Education - {downloadedCourses.length} of {availableDownloads} courses
              downloaded
            </p>
          </div>
        </div>

        {/* Download Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-sky-500" />
              Course Access Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-sky-50 rounded-lg">
              <div>
                <div className="font-semibold text-sky-800">Available Downloads</div>
                <div className="text-sm text-sky-600">
                  You can download {availableDownloads} course{availableDownloads !== 1 ? "s" : ""} based on your active
                  plans
                </div>
              </div>
              <div className="text-2xl font-bold text-sky-600">
                {availableDownloads - downloadedCourses.length} remaining
              </div>
            </div>
            {availableDownloads === 0 && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="font-medium text-orange-800 mb-2">No courses available</div>
                <div className="text-sm text-orange-600 mb-3">
                  You need an active plan to access courses. Purchase a plan to unlock educational content.
                </div>
                <Link href="/plans">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    View Plans
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const downloaded = isDownloaded(course.id)
            const canDownloadCourse = canDownload(course.id)
            const isLocked = !downloaded && !canDownloadCourse

            return (
              <Card
                key={course.id}
                className={`relative ${isLocked ? "opacity-60 bg-gray-100" : "hover:shadow-lg transition-shadow"}`}
              >
                {isLocked && (
                  <div className="absolute top-4 right-4 z-10">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                )}

                {downloaded && (
                  <div className="absolute top-4 right-4 z-10">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className={`text-lg mb-2 ${isLocked ? "text-gray-500" : "text-gray-900"}`}>
                        {course.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isLocked ? "bg-gray-200 text-gray-500" : "bg-sky-100 text-sky-700"
                          }`}
                        >
                          {course.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            isLocked
                              ? "bg-gray-200 text-gray-500"
                              : course.difficulty === "Beginner"
                                ? "bg-green-100 text-green-700"
                                : course.difficulty === "Intermediate"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {course.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className={`text-sm mb-4 ${isLocked ? "text-gray-400" : "text-gray-600"}`}>{course.description}</p>

                  <div className={`text-xs mb-4 ${isLocked ? "text-gray-400" : "text-gray-500"}`}>
                    Estimated time: {course.estimatedTime}
                  </div>

                  {downloaded ? (
                    <Button disabled className="w-full bg-green-500 hover:bg-green-500 cursor-not-allowed">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Downloaded
                    </Button>
                  ) : canDownloadCourse ? (
                    <Button onClick={() => handleDownload(course)} className="w-full bg-sky-500 hover:bg-sky-600">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-gray-300 hover:bg-gray-300 cursor-not-allowed text-gray-500">
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Upgrade Prompt */}
        {downloadedCourses.length >= availableDownloads && availableDownloads > 0 && (
          <Card className="mt-8 bg-gradient-to-br from-sky-500 to-sky-600 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-xl mb-2">Want More Courses?</h3>
              <p className="text-sky-100 mb-4">
                Unlock additional educational content by adding more Boost Plans to your account
              </p>
              <Link href="/add-boost">
                <Button variant="secondary" className="bg-white text-sky-600 hover:bg-gray-100">
                  Add Boost Plan
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>

      <FooterNavigation />
    </div>
  )
}
