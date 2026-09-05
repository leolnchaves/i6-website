import { Mail, MessageCircle, MessagesSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { DocsSupportChannelCopy, DocsSupportCopy } from '@/data/docs/content';

const SUPPORT_EMAIL = 'suporte@infinity6.ai';

interface DocsSupportProps {
  copy: DocsSupportCopy;
}

/**
 * Implementation support block shown at the end of every documentation page.
 * Mirrors the i6 Decision Suite support panel: one wide card with channel cards.
 * WhatsApp and the assistant stay informative until real destinations exist.
 */
const DocsSupport = ({ copy }: DocsSupportProps) => (
  <section className="mt-12 flex min-w-0 flex-col gap-4 rounded-2xl border border-border bg-card p-5">
    <div className="min-w-0">
      <h2 className="text-sm font-semibold text-foreground">{copy.title}</h2>
      <p className="text-sm text-muted-foreground">{copy.body}</p>
    </div>

    <ul className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      <ChannelCard channel={copy.channels.email} icon={Mail}>
        <Button asChild variant="outline" size="sm">
          <a href={`mailto:${SUPPORT_EMAIL}`}>{copy.emailAction}</a>
        </Button>
      </ChannelCard>

      <ChannelCard channel={copy.channels.whatsapp} icon={MessageCircle}>
        <Button type="button" variant="outline" size="sm" disabled>
          {copy.comingSoon}
        </Button>
      </ChannelCard>

      <ChannelCard channel={copy.channels.assistant} icon={MessagesSquare}>
        <Button type="button" variant="outline" size="sm" disabled>
          {copy.comingSoon}
        </Button>
      </ChannelCard>
    </ul>
  </section>
);

const ChannelCard = ({
  channel,
  icon: Icon,
  children,
}: {
  channel: DocsSupportChannelCopy;
  icon: typeof Mail;
  children: React.ReactNode;
}) => (
  <li className="flex min-w-0 flex-col gap-2 rounded-xl border border-border bg-muted/20 p-4">
    <div className="flex min-w-0 items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <span className="truncate text-sm font-medium text-foreground">{channel.label}</span>
    </div>

    <p className="text-xs text-muted-foreground">{channel.description}</p>

    {channel.availability && (
      <Badge variant="secondary" className="w-fit text-[11px] font-normal">
        {channel.availability}
      </Badge>
    )}

    <div className="mt-auto pt-1">{children}</div>
  </li>
);

export default DocsSupport;
