interface SectionStripProps {
  label: string;
  count?: string;
}

function SectionStrip({ label, count }: SectionStripProps) {
  return (
    <div className="border-title-light flex items-center gap-4 border-b-2 px-6 py-4 md:px-8">
      <span className="font-heading text-title-light tracking-meta font-black uppercase md:text-lg">{label}</span>
      <span className="bg-title-light h-0.5 flex-1" />
      {count && <span className="font-heading text-acid tracking-label font-bold uppercase">{count}</span>}
    </div>
  );
}

export default SectionStrip;
