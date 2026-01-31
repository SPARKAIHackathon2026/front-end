import { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const teamMembers = [
  {
    name: '陈明远',
    nameEn: 'Michael Chen',
    role: '创始人 & CEO',
    roleEn: 'Founder & CEO',
    image: '/team-1.jpg',
    bio: '前 Binance 税务合规负责人，10年金融科技经验',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: '林雨萱',
    nameEn: 'Sarah Lin',
    role: '首席技术官',
    roleEn: 'CTO',
    image: '/team-2.jpg',
    bio: 'MIT 计算机科学博士，区块链安全专家',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Alexander Weber',
    nameEn: 'Alex Weber',
    role: '首席合规官',
    roleEn: 'Chief Compliance Officer',
    image: '/team-3.jpg',
    bio: '前 OECD 税收政策顾问，CARF 框架制定参与者',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Amara Johnson',
    nameEn: 'Amara Johnson',
    role: '产品总监',
    roleEn: 'Head of Product',
    image: '/team-4.jpg',
    bio: '前 Coinbase 产品经理，专注 Web3 用户体验',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.team-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="team" 
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="section-padding">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#3898EC]/30 mb-6">
            <span className="text-sm text-[#3898EC]">核心团队</span>
          </div>
          <h2 className="text-responsive-section font-bold text-white mb-6">
            由<span className="text-[#3898EC]">行业专家</span>打造
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            我们的团队来自全球顶尖金融科技公司和监管机构，
            致力于为用户提供最专业、最安全的税务合规服务。
          </p>
        </div>

        {/* Team Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => {
            const isVisible = visibleCards.has(index);
            
            return (
              <div
                key={index}
                data-index={index}
                className={`team-card group transition-all duration-700 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="glass-card rounded-2xl overflow-hidden hover:border-[#3898EC]/40 transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Social Links */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <a 
                        href={member.social.linkedin}
                        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3898EC] transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                      <a 
                        href={member.social.twitter}
                        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3898EC] transition-colors"
                      >
                        <Twitter className="w-4 h-4 text-white" />
                      </a>
                      <a 
                        href={member.social.github}
                        className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3898EC] transition-colors"
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#3898EC] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#3898EC]/60 uppercase tracking-wider mb-2">
                      {member.nameEn}
                    </p>
                    <p className="text-sm text-white/70 mb-1">{member.role}</p>
                    <p className="text-xs text-white/40">{member.roleEn}</p>
                    <p className="text-xs text-white/50 mt-3 line-clamp-2">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join Us CTA */}
        <div 
          className={`max-w-2xl mx-auto mt-16 text-center transition-all duration-700 delay-700 ${
            visibleCards.size > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-card rounded-2xl p-8 border-gradient">
            <h3 className="text-xl font-semibold text-white mb-3">
              加入我们的团队
            </h3>
            <p className="text-white/60 mb-6">
              我们正在寻找对 Web3 和税务合规充满热情的人才
            </p>
            <button 
              onClick={() => window.open('https://github.com/orgs/SPARKAIHackathon2026/repositories', '_blank')}
              className="btn-secondary text-sm py-3 px-8"
            >
              查看职位
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
