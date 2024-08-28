import Keymerging from "@/components/KeymergingComponent";


export default function Page({ params }: { params: { slug: any } }) {
  return (
    <main className="flex h-[100dvh] w-[100dvw] bg-main justify-center items-center">
      <div className='w-[90%] md:w-5/6 lg:w-1/3 sm:w-2/3'>
        <Keymerging vaddress={params.slug[0]} partialkey={params.slug[1]} />
      </div>
    </main>
  )
}
