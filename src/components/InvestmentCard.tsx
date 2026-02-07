import { Investment } from '@/lib/content';

interface InvestmentCardProps {
  investment: Investment;
}

export default function InvestmentCard({ investment }: InvestmentCardProps) {
  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-mono text-base font-medium text-foreground">
          {investment.company}
        </h3>
        {investment.entryPoint && (
          <span className="label flex-shrink-0">
            {investment.entryPoint}
          </span>
        )}
      </div>

      <p className="text-muted text-sm">{investment.thesis}</p>

      {investment.content && (
        <div className="text-muted text-sm mt-3 line-clamp-3">
          {investment.content}
        </div>
      )}
    </div>
  );
}
